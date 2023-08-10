import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { medicalRecordValidationSchema } from 'validationSchema/medical-records';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.medical_record
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getMedicalRecordById();
    case 'PUT':
      return updateMedicalRecordById();
    case 'DELETE':
      return deleteMedicalRecordById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMedicalRecordById() {
    const data = await prisma.medical_record.findFirst(convertQueryToPrismaUtil(req.query, 'medical_record'));
    return res.status(200).json(data);
  }

  async function updateMedicalRecordById() {
    await medicalRecordValidationSchema.validate(req.body);
    const data = await prisma.medical_record.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteMedicalRecordById() {
    const data = await prisma.medical_record.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
