import { Button, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { DateParser } from '../../app_utils/TimeParser';
import { stringTruncate } from '../../app_utils/ZUtils';
import ZCheckbox from '../../components/ZCheckbox';
import ZTextField from '../../components/ZTextField';
import { DocumentModel } from '../../models/DocumentModel';
import { useAppStore } from '../../models_stores/appStore';

interface Props {}

interface DocState {
  state: string;
}

const DocumentsPage: React.FC<Props> = () => {
  const history = useHistory();
  const classes = useStyles();
  const [search, setSearch] = React.useState<string>('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = React.useState<DocumentModel>();
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [isSelectedAllRows, setIsSelectedAllRows] = React.useState<boolean>(false);
  const documents = useAppStore((state) => state.documents);
  const [documentSearch, setDocumentSearch] = React.useState<DocumentModel[]>([]);

  const authUser = useAppStore((state) => state.authUser);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  function goToProductDetailsPage(document: DocumentModel) {
    history.push(`/documentDetails/${document.id}`, document);
  }
  React.useEffect(() => {
    if (search === '') {
      return setDocumentSearch(documents);
    }
    if (search !== '') {
      const result = documents.filter(
        (document) => document.firstName.toLowerCase().includes(search.toLowerCase()) || document.lastName.toLowerCase().includes(search.toLowerCase())
      );
      return setDocumentSearch(result);
    }
  }, [documents, search]);

  const ZDocumentState = (docState: DocState) => {
    let className = classes.statePending;
    if (docState.state === 'Reviewing') className = classes.stateReviewing;
    if (docState.state === 'Completed') className = classes.stateCompleted;
    if (docState.state === 'Resubmit') className = classes.stateResubmit;
    return <span className={`${classes.stateWrapper} ${className}`}>{stringTruncate({ value: docState.state.toUpperCase(), numberCharacter: 40 })}</span>;
  };

  return (
    <Grid>
      {/* <ZDrawerProductAdd openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} notification={selectedDocument} setSelectedNotification={setSelectedNotifications} /> */}
      <Paper>
        <Grid className={classes.tableHeading} container alignItems='center' justify='space-between'>
          <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
            Documents
          </Typography>
        </Grid>

        <Grid container alignItems='center' justify='space-between'>
          <Grid item md={12}>
            <ZTextField className={classes.search} onChange={setSearch} defaultValue={''} label='Search...' />
          </Grid>
        </Grid>

        <Divider className={classes.divider} />
        <TableContainer>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell align='left' padding='checkbox'>
                  <ZCheckbox
                    className={classes.checkbox}
                    isChecked={isSelectedAllRows}
                    onChange={(v) => {
                      if (v) {
                        setIsSelectedAllRows(v);
                        setSelectedRows(documentSearch.map((e) => e.id));
                      }
                      if (!v) {
                        setIsSelectedAllRows(v);
                        setSelectedRows([]);
                      }
                    }}
                  />
                </TableCell>
                <TableCell align='left'>Name</TableCell>
                <TableCell align='left'>Documents</TableCell>
                <TableCell align='left'>Date Added</TableCell>
                <TableCell align='left'>Status</TableCell>
                <TableCell align='right'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documentSearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((document) => (
                <TableRow key={document.id}>
                  <TableCell align='left' padding='checkbox'>
                    <ZCheckbox
                      className={classes.checkbox}
                      isChecked={selectedRows.includes(document.id)}
                      onChange={(v) => {
                        if (v) setSelectedRows([...selectedRows, document.id]);
                        if (!v) setSelectedRows(selectedRows.filter((e) => e !== document.id));
                      }}
                    />
                  </TableCell>
                  <TableCell align='left'> {stringTruncate({ value: document.getFullName(), numberCharacter: 40 })}</TableCell>
                  <TableCell scope='row'>{stringTruncate({ value: document.getTotalDocuments(), numberCharacter: 40 })}</TableCell>
                  <TableCell align='left'>{DateParser(document.timestampCreated, false)}</TableCell>

                  <TableCell scope='row'>
                    <ZDocumentState state={document.state} />
                  </TableCell>
                  <TableCell align='right'>
                    <Button
                      className={classes.buttonEdit}
                      onClick={() => {
                        setSelectedDocument(Object.create(document));
                        goToProductDetailsPage(document);
                        setOpenDrawer(true);
                      }}
                      size='small'
                      color='secondary'
                      variant='contained'
                    >
                      EDIT
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            {documentSearch.length ? (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={8}
                    count={documentSearch.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            ) : null}
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  tableHeading: {
    padding: '8px 8px'
  },
  search: {
    margin: '0px 18px 5px 18px'
  },
  itemsGrid: {
    marginTop: 30
  },
  buttonView: {
    padding: 0
  },
  buttonEdit: {
    padding: 0,
    color: '#f44336',
    backgroundColor: 'rgba(244, 67, 54, 0.08)'
  },
  title: {
    padding: '10px 10px'
  },
  divider: {
    marginTop: 20,
    marginBottom: 0
  },
  buttonAdd: {
    margin: 10,
    color: 'white',
    backgroundColor: '#5850EC'
  },
  itemPaper: {
    padding: 10,
    margin: 10
  },
  itemButton: {
    margin: '0px 3px',
    padding: 0
  },
  table: {
    minWidth: 750
  },
  tableRow: {
    // border: '1px solid white'
  },
  tablePagination: {
    width: '100%'
  },
  itemText: {},
  iconButtonContainer: {
    padding: 0,
    marginLeft: 12
  },
  iconButtonEdit: {
    padding: 0,
    fontSize: 22,
    color: theme.palette.secondary.light
  },
  iconButtonView: {
    padding: 0,
    fontSize: 22,
    color: theme.palette.primary.light
  },
  checkbox: {
    marginTop: 0,
    marginLeft: 12
  },
  chipContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  stateWrapper: {
    padding: 5,
    fontSize: 14,
    fontWeight: 500
  },
  statePending: {
    color: '#ff9800',
    backgroundColor: 'rgba(255, 152, 0, 0.08)',
    '&:hover, &:focus': {
      color: '#ff9800',
      backgroundColor: 'rgba(255, 152, 0, 0.08)'
    }
  },
  stateReviewing: {
    color: '#00aeff',
    backgroundColor: 'rgba(0, 17, 255, 0.08)',
    '&:hover, &:focus': {
      color: '#00aeff',
      backgroundColor: 'rgba(0, 17, 255, 0.08)'
    }
  },
  stateResubmit: {
    color: '#f44336',
    backgroundColor: 'rgba(244, 67, 54, 0.08)',
    '&:hover, &:focus': {
      color: '#f44336',
      backgroundColor: 'rgba(244, 67, 54, 0.08)'
    }
  },
  stateCompleted: {
    color: '#4caf50',
    backgroundColor: 'rgba(76, 175, 80, 0.08)',
    '&:hover, &:focus': {
      color: '#4caf50',
      backgroundColor: 'rgba(76, 175, 80, 0.08)'
    }
  }
}));

DocumentsPage.defaultProps = {};

export default DocumentsPage;
