import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import {
  Field,
  Form,
  Formik,
  FormikConfig,
  FormikValues,
  FieldArray,
  getIn,
} from "formik";
import { CheckboxWithLabel, TextField, InputBase } from "formik-material-ui";
import React, { useState } from "react";
import { mixed, number, object } from "yup";
import { generate } from "shortid";
import dynamic from "next/dynamic";
const MuiPhoneNumber = dynamic(import("material-ui-phone-number"), {
  ssr: false,
});

const PhoneNumberInput = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];

  return (
    <MuiPhoneNumber
      defaultCountry={"ie"}
      countryCodeEditable={false}
      name={field.name}
      value={field.value}
      helperText={currentError}
      disabled={form.isSubmitting}
      error={Boolean(currentError)}
      onError={(error) => {
        // handle as a side effect
        if (error !== currentError) {
          form.setFieldError(field.name, error);
        }
      }}
      onChange={(value) => {
        value = value.replace(/^\+33 0 ?([1-9])/, "+33 $1");
        form.setFieldValue(field.name, value, false);
      }}
      {...other}
    />
  );
};

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Formik
          initialValues={{
            address: "",
            blister: "",
            claimReceipt: "",
            collectionDate: "",
            collectionOrDelivery: "",
            collectionTime: "",
            deliveryAddress: "",
            deliveryMethod: "",
            dispatchDate: "",
            howManyMonths: "",
            howManyPeople: "",
            itemsOwed: "",
            itemsPatient1: "",
            itemsPatient2: "",
            itemsPatient3: "",
            itemsPatient4: "",
            itemsPatient5: "",
            keepPrescription: "",
            orderType: "",
            patients: [
              {
                id: generate(),
                firstName: "",
                lastName: "",
                items: "",
              },
            ],
            paymentMethod: "",
            phoneNumber: "",
            submitterId: 360903995225,
            waitingOrCollect: "",
            whereIsPrescription: "",
          }}
          onSubmit={() => {}}
        >
          {({ values, touched, errors, handleChange, handleBlur, isValid }) => (
            <Form noValidate autoComplete="off">
              <Container>
                <Typography variant="h3">
                  {`Patient${values.patients.length > 1 ? "s" : ""} details`}
                </Typography>
              </Container>
              <FieldArray name="patients">
                {({ push, remove }) => (
                  <Container>
                    {values.patients.map((p, i) => {
                      const firstName = `patients[${i}].firstName`;
                      const touchedFirstName = getIn(touched, firstName);
                      const errorFirstName = getIn(errors, firstName);

                      const lastName = `patients[${i}].lastName`;
                      const touchedLastName = getIn(touched, lastName);
                      const errorLastName = getIn(errors, lastName);

                      const items = `patients[${i}].items`;
                      const touchedItems = getIn(touched, items);

                      const errorItems = getIn(errors, items);

                      return (
                        <div key={p.id}>
                          <Container>
                            <Typography variant="h6">
                              {`Patient ${i + 1}`}
                            </Typography>
                          </Container>
                          <Container>
                            <Field
                              component={TextField}
                              label="First Name"
                              name={firstName}
                              onBlur={handleBlur}
                              required
                              variant="outlined"
                            />
                            <Field
                              component={TextField}
                              label="Last Name"
                              name={lastName}
                              onBlur={handleBlur}
                              required
                              variant="outlined"
                            />
                            <Field
                              component={TextField}
                              label="Items required ..."
                              name={items}
                              onBlur={handleBlur}
                              required
                              variant="outlined"
                            />
                          </Container>
                        </div>
                      );
                    })}
                  </Container>
                )}
              </FieldArray>

              <Container>
                <div>
                  <Typography variant="h6">Phone Number</Typography>
                </div>
                <Field
                  component={PhoneNumberInput}
                  label="08X..."
                  type="phone"
                  name="phoneNumber"
                  onBlur={handleBlur}
                  required
                  fullWidth
                  variant="outlined"
                />
              </Container>

              <div>
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
