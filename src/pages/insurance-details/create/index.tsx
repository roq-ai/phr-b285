import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createInsuranceDetail } from 'apiSdk/insurance-details';
import { insuranceDetailValidationSchema } from 'validationSchema/insurance-details';
import { PatientInterface } from 'interfaces/patient';
import { getPatients } from 'apiSdk/patients';
import { InsuranceDetailInterface } from 'interfaces/insurance-detail';

function InsuranceDetailCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: InsuranceDetailInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createInsuranceDetail(values);
      resetForm();
      router.push('/insurance-details');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<InsuranceDetailInterface>({
    initialValues: {
      insurance_provider: '',
      policy_number: '',
      patient_id: (router.query.patient_id as string) ?? null,
    },
    validationSchema: insuranceDetailValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Insurance Details',
              link: '/insurance-details',
            },
            {
              label: 'Create Insurance Detail',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Insurance Detail
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.insurance_provider}
            label={'Insurance Provider'}
            props={{
              name: 'insurance_provider',
              placeholder: 'Insurance Provider',
              value: formik.values?.insurance_provider,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.policy_number}
            label={'Policy Number'}
            props={{
              name: 'policy_number',
              placeholder: 'Policy Number',
              value: formik.values?.policy_number,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<PatientInterface>
            formik={formik}
            name={'patient_id'}
            label={'Select Patient'}
            placeholder={'Select Patient'}
            fetcher={getPatients}
            labelField={'first_name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/insurance-details')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'insurance_detail',
    operation: AccessOperationEnum.CREATE,
  }),
)(InsuranceDetailCreatePage);
