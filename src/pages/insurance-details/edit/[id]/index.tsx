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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getInsuranceDetailById, updateInsuranceDetailById } from 'apiSdk/insurance-details';
import { insuranceDetailValidationSchema } from 'validationSchema/insurance-details';
import { InsuranceDetailInterface } from 'interfaces/insurance-detail';
import { PatientInterface } from 'interfaces/patient';
import { getPatients } from 'apiSdk/patients';

function InsuranceDetailEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<InsuranceDetailInterface>(
    () => (id ? `/insurance-details/${id}` : null),
    () => getInsuranceDetailById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: InsuranceDetailInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateInsuranceDetailById(id, values);
      mutate(updated);
      resetForm();
      router.push('/insurance-details');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<InsuranceDetailInterface>({
    initialValues: data,
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
              label: 'Update Insurance Detail',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Insurance Detail
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(InsuranceDetailEditPage);
