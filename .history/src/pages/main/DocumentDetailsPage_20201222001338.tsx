import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import { DocumentModel, DocumentItemModel, IDocumentItem } from '../../models/DocumentModel';
import { fireFirestore } from '../../firebase/firebase';
import { Button, Container, Divider, Grid, LinearProgress, Paper, Typography } from '@material-ui/core';
import { FirestoreService } from '../../models_services/FirestoreService';
import { useSnackbar } from 'notistack';
import ZTextField from '../../components/ZTextField';
import { DocumentEntryModel } from '../../models/DocumentEntryModel';
import ZTimeDatePicker from '../../components/ZTimeDatePicker';

interface Props { }

interface ParamTypes {
  id: string;
}

interface PropsDocumentItem {
  documentItem: DocumentItemModel | undefined | null;
  objectName: string;
  heading: string;
}

const DocumentDetailsPage: React.FC<Props> = () => {
  const [selectedDate, handleDateChange] = React.useState<Date | null>(new Date());
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { id } = useParams<ParamTypes>();
  const [document, setDocument] = React.useState<DocumentModel | null>(history.location.state as DocumentModel);
  const [documentEntry, setDocumentEntry] = React.useState<DocumentEntryModel | null>();

  const updateDocument = async () => {
    if (document) {
      setIsLoading(true);

      const res = await FirestoreService.documentUpdate(document);
      if (res) {
        history.push(`/documents`);
        enqueueSnackbar('Document updated');
      } else {
        enqueueSnackbar('Error updating document');
      }
    }
    setIsLoading(false);
  };
  const updateDocumentEntry = async () => {
    if (documentEntry && document) {
      setIsLoading(true);
      console.log(documentEntry);
      console.log(document.id);
      const res = await FirestoreService.updateDocumentEntry(documentEntry, document?.id);
      if (res) {
        enqueueSnackbar('Document updated');
      } else {
        enqueueSnackbar('Error updating document');
      }
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    console.log(id);
    const initState = async () => {
      setIsLoading(true);
      const queryDocument = await fireFirestore.collection('documents').doc(id).get();
      setDocument(DocumentModel.fromFirestore(queryDocument));

      const queryDocumentEntry = await fireFirestore.collection('documentsEntries').doc(id).get();
      console.log(queryDocumentEntry);
      setDocumentEntry(DocumentEntryModel.fromFirestore(queryDocumentEntry));

      console.log(documentEntry);

      setIsLoading(false);
    };
    initState();
  }, []);

  const SectionDivider = (props: any) => {
    return <div className={classes.heading}>{props.heading}</div>;
  };

  const DocumentItem: React.FC<PropsDocumentItem> = ({ documentItem, objectName, heading }) => {
    return (
      <>
        <Typography className={classes.documentItemTitle}>{heading}</Typography>
        <img className={classes.image} src={documentItem?.imageUrl} alt='' />
        <div />
        <Grid className={classes.buttonGrid} container justify='center'>
          <Button
            className={classes.button}
            variant='contained'
            color={documentItem?.state === 'Reviewing' ? 'primary' : undefined}
            size='small'
            onClick={() => {
              setDocument((prev) => ({ ...prev, [objectName]: { ...documentItem, state: 'Reviewing' } } as DocumentModel));
              console.log(document);
            }}
          >
            Reviewing
          </Button>
          <Button
            className={classes.button}
            color={documentItem?.state === 'Accepted' ? 'primary' : undefined}
            variant='contained'
            size='small'
            onClick={() => {
              setDocument((prev) => ({ ...prev, [objectName]: { ...documentItem, state: 'Accepted' } } as DocumentModel));
              console.log(document);
            }}
          >
            Accepted
          </Button>
          <Button
            className={classes.button}
            color={documentItem?.state === 'Resubmit' ? 'primary' : undefined}
            variant='contained'
            size='small'
            onClick={() => {
              setDocument((prev) => ({ ...prev, [objectName]: { ...documentItem, state: 'Resubmit' } } as DocumentModel));
              console.log(document);
            }}
          >
            Resubmit
          </Button>
        </Grid>
      </>
    );
  };

  return (
    <>
      {isLoading && <LinearProgress className={classes.textField} />}
      {!isLoading && (
        <div>
          <Container maxWidth='xl'>
            <Grid container alignItems='flex-start'>
              <Grid md={5} item container>
                <Grid className={classes.buttonWrapper} container item xs={12} md={12} justify='center'>
                  <Button className={classes.button} color='primary' variant='contained' onClick={updateDocumentEntry} disabled={isLoading}>
                    Save Entered Data
                  </Button>
                </Grid>
                <Paper className={classes.paper}>
                  <SectionDivider heading='Information' />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, email: v } as DocumentEntryModel));
                      console.log(documentEntry);
                    }}
                    label='Email'
                    defaultValue={documentEntry?.email}
                  />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, firstName: v } as DocumentEntryModel));
                    }}
                    label='First Name'
                    defaultValue={documentEntry?.firstName}
                  />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, lastName: v } as DocumentEntryModel));
                    }}
                    label='Last Name'
                    defaultValue={documentEntry?.lastName}
                  />

                  <ZTimeDatePicker
                    className={classes.textField}
                    label='Date of birth'
                    defaultValue={documentEntry?.dateOfBirth}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, dateOfBirth: v } as DocumentEntryModel));
                    }}
                  />

                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, phoneNumber: v } as DocumentEntryModel));
                    }}
                    label='Phone number'
                    defaultValue={documentEntry?.phoneNumber}
                  />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, gender: v } as DocumentEntryModel));
                    }}
                    label='Gender'
                    defaultValue={documentEntry?.gender}
                  />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, eyeColor: v } as DocumentEntryModel));
                    }}
                    label='Eye Color'
                    defaultValue={documentEntry?.eyeColor}
                  />
                  <SectionDivider heading='Drivers license' />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, driversLicenseId: v } as DocumentEntryModel));
                    }}
                    label='Drivers license #'
                    defaultValue={documentEntry?.driversLicenseId}
                  />

                  <ZTimeDatePicker
                    className={classes.textField}
                    label='License Issue date'
                    defaultValue={documentEntry?.driversLicenseIssueDate}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, driversLicenseIssueDate: v } as DocumentEntryModel));
                    }}
                  />
                  <ZTimeDatePicker
                    className={classes.textField}
                    label='License Expiry date'
                    defaultValue={documentEntry?.driversLicenseExpiryDate}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, driversLicenseExpiryDate: v } as DocumentEntryModel));
                    }}
                  />

                  <SectionDivider heading='Address' />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, address1: v } as DocumentEntryModel));
                    }}
                    label='Address 1'
                    defaultValue={documentEntry?.address1}
                  />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, address2: v } as DocumentEntryModel));
                    }}
                    label='Address 2'
                    defaultValue={documentEntry?.address2}
                  />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, addressCity: v } as DocumentEntryModel));
                    }}
                    label='City'
                    defaultValue={documentEntry?.addressCity}
                  />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, addressState: v } as DocumentEntryModel));
                    }}
                    label='State'
                    defaultValue={documentEntry?.addressState}
                  />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, addressZip: v } as DocumentEntryModel));
                    }}
                    label='ZIP'
                    defaultValue={documentEntry?.addressZip}
                  />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, addressCountry: v } as DocumentEntryModel));
                    }}
                    label='Country'
                    defaultValue={documentEntry?.addressCountry}
                  />
                  <SectionDivider heading='Insurance' />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, insurancePolicyId: v } as DocumentEntryModel));
                    }}
                    label='Insurance policy #'
                    defaultValue={documentEntry?.insurancePolicyId}
                  />

                  <ZTimeDatePicker
                    className={classes.textField}
                    label='Effective Date'
                    defaultValue={documentEntry?.insuranceIssueDate}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, insuranceIssueDate: v } as DocumentEntryModel));
                    }}
                  />
                  <ZTimeDatePicker
                    className={classes.textField}
                    label='Expiry Date'
                    defaultValue={documentEntry?.insuranceExpiryDate}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, insuranceExpiryDate: v } as DocumentEntryModel));
                    }}
                  />

                  <SectionDivider heading='Vehicle' />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, vehicleVin: v } as DocumentEntryModel));
                    }}
                    label='Vehicle vin'
                    defaultValue={documentEntry?.vehicleVin}
                  />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, vehicleMake: v } as DocumentEntryModel));
                    }}
                    label='Vehicle make'
                    defaultValue={documentEntry?.vehicleMake}
                  />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, vehicleModel: v } as DocumentEntryModel));
                    }}
                    label='Vehicle model'
                    defaultValue={documentEntry?.vehicleModel}
                  />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, vehicleModel: v } as DocumentEntryModel));
                    }}
                    label='Vehicle year'
                    defaultValue={documentEntry?.vehicleYear}
                  />
                  <ZTimeDatePicker
                    className={classes.textField}
                    label='Vehicle Registration Date'
                    defaultValue={documentEntry?.vehicleRegistrationDate}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, vehicleRegistrationDate: v } as DocumentEntryModel));
                    }}
                  />
                  <ZTimeDatePicker
                    className={classes.textField}
                    label='Vehicle Registration Exp Date'
                    defaultValue={documentEntry?.vehicleRegistrationExpDate}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, vehicleRegistrationExpDate: v } as DocumentEntryModel));
                    }}
                  />

                  <SectionDivider heading='Alt ID' />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, alternateId: v } as DocumentEntryModel));
                    }}
                    label='Alt Id#'
                    defaultValue={documentEntry?.alternateId}
                  />
                  <ZTextField
                    className={classes.textField}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, alternateId: v } as DocumentEntryModel));
                    }}
                    label='Alt ID name'
                    defaultValue={documentEntry?.alternateIdName}
                  />

                  <ZTimeDatePicker
                    className={classes.textField}
                    label='Alt ID Issue Date'
                    defaultValue={documentEntry?.alternateIdIssueDate}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, alternateIdIssueDate: v } as DocumentEntryModel));
                    }}
                  />

                  <ZTimeDatePicker
                    className={classes.textField}
                    label='Alt ID Exp Date'
                    defaultValue={documentEntry?.alternateIdExpiryDate}
                    onChange={(v) => {
                      setDocumentEntry((prev) => ({ ...prev, alternateIdExpiryDate: v } as DocumentEntryModel));
                    }}
                  />
                </Paper>
              </Grid>

              <Grid item md={6} container>
                <Grid className={classes.buttonWrapper} container item xs={12} md={12} justify='center'>
                  <Button className={classes.button} color='primary' variant='contained' onClick={updateDocument}>
                    Save Documents
                  </Button>
                </Grid>
                <Paper className={classes.paper}>
                  <Grid className={classes.documentItem} container item xs={12} justify='center'>
                    <DocumentItem documentItem={document?.driversPicture} objectName='driversPicture' heading='Profile Picture' />
                  </Grid>
                  <Grid className={classes.documentItem} container item xs={12} justify='center'>
                    <DocumentItem documentItem={document?.driversLicenseFront} objectName='driversLicenseFront' heading='License Front' />
                  </Grid>
                  <Grid className={classes.documentItem} container item xs={12} justify='center'>
                    <DocumentItem documentItem={document?.driversLicenseBack} objectName='driversLicenseBack' heading='License back' />
                  </Grid>
                  <Grid className={classes.documentItem} container item xs={12} justify='center'>
                    <DocumentItem documentItem={document?.driversInsuranceCardFront} objectName='driversInsuranceCardFront' heading='Insurance Card Front' />
                  </Grid>
                  <Grid className={classes.documentItem} container item xs={12} justify='center'>
                    <DocumentItem documentItem={document?.driversInsuranceCardBack} objectName='driversInsuranceCardBack' heading='Insurance Card Back' />
                  </Grid>
                  <Grid className={classes.documentItem} container item xs={12} justify='center'>
                    <DocumentItem documentItem={document?.driversVehicleRegistrationFront} objectName='driversVehicleRegistrationFront' heading='Vehicle Registration Front' />
                  </Grid>
                  <Grid className={classes.documentItem} container item xs={12} justify='center'>
                    <DocumentItem documentItem={document?.driversVehicleRegistrationBack} objectName='driversVehicleRegistrationBack' heading='Vehicle Registration back' />
                  </Grid>
                  <Grid className={classes.documentItem} container item xs={12} justify='center'>
                    <DocumentItem documentItem={document?.driversTaxiLimousineIdFront} objectName='driversTaxiLimousineIdFront' heading='Taxi Limousine Id Front' />
                  </Grid>
                  <Grid className={classes.documentItem} container item xs={12} justify='center'>
                    <DocumentItem documentItem={document?.driversTaxiLimousineIdBack} objectName='driversTaxiLimousineIdBack' heading='Taxi Limousine Id Back' />
                  </Grid>
                  <Divider />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    margin: '0px 20px',
    padding: 10,
    width: '100%',
    minHeight: 800,
    maxHeight: `calc(100vh - 200px)`,
    overflow: 'hidden',
    overflowY: 'auto'
  },
  heading: {
    fontSize: 18,
    fontWeight: 700,
    marginTop: 10,
    marginLeft: 16
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 5,
    height: 940,
    overflow: 'hidden',
    overflowY: 'auto',

  },
  documentItem: {
    marginBottom: 30
  },
  documentItemTitle: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    fontSize: 16,
    fontWeight: 500
  },
  buttonGrid: {
    marginTop: 10
  },
  buttonWrapper: {
    marginBottom: 10
  },
  button: {
    marginRight: 10
  },
  image: {
    display: 'block',
    border: `1px solid #dfe6e9`,
    borderRadius: '6px',
    width: 550,
    height: 550,
    margin: 4,
    transform: 'rotate(180deg)'
  },
  textField: {
    width: '100%',
    padding: '0px 20px 10px 20px'
  },
  divider: {
    color: 'black',
    backgroundColor: 'black',
    display: 'block',
    width: '80%',
    height: 2,
    marginBottom: '5px'
  }
}));

DocumentDetailsPage.defaultProps = {};

export default DocumentDetailsPage;
