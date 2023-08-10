import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { insuranceDetailValidationSchema } from 'validationSchema/insurance-details';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.insurance_detail
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getInsuranceDetailById();
    case 'PUT':
      return updateInsuranceDetailById();
    case 'DELETE':
      return deleteInsuranceDetailById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getInsuranceDetailById() {
    const data = await prisma.insurance_detail.findFirst(convertQueryToPrismaUtil(req.query, 'insurance_detail'));
    return res.status(200).json(data);
  }

  async function updateInsuranceDetailById() {
    await insuranceDetailValidationSchema.validate(req.body);
    const data = await prisma.insurance_detail.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteInsuranceDetailById() {
    const data = await prisma.insurance_detail.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
