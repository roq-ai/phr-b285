import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { patientValidationSchema } from 'validationSchema/patients';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getPatients();
    case 'POST':
      return createPatient();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPatients() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.patient
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'patient'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createPatient() {
    await patientValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.insurance_detail?.length > 0) {
      const create_insurance_detail = body.insurance_detail;
      body.insurance_detail = {
        create: create_insurance_detail,
      };
    } else {
      delete body.insurance_detail;
    }
    if (body?.laboratory_result?.length > 0) {
      const create_laboratory_result = body.laboratory_result;
      body.laboratory_result = {
        create: create_laboratory_result,
      };
    } else {
      delete body.laboratory_result;
    }
    if (body?.medical_record?.length > 0) {
      const create_medical_record = body.medical_record;
      body.medical_record = {
        create: create_medical_record,
      };
    } else {
      delete body.medical_record;
    }
    if (body?.prescription?.length > 0) {
      const create_prescription = body.prescription;
      body.prescription = {
        create: create_prescription,
      };
    } else {
      delete body.prescription;
    }
    const data = await prisma.patient.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
