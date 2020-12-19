import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import * as React from 'react';
import { DateParser } from '../../app_utils/TimeParser';
import { stringTruncate } from '../../app_utils/ZUtils';
import ZCheckbox from '../../components/ZCheckbox';
import ZDrawerProductAdd from '../../components/ZDrawerNotification';
import ZTextField from '../../components/ZTextField';
import { NotificationModel } from '../../models/NotificationModel';
import { useAppStore } from '../../models_stores/appStore';

interface Props {}

const NotificationPage: React.FC<Props> = () => {
  const classes = useStyles();
  const [search, setSearch] = React.useState<string>('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [selectedNotifications, setSelectedNotifications] = React.useState<NotificationModel>();
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [isSelectedAllRows, setIsSelectedAllRows] = React.useState<boolean>(false);
  const notifications = useAppStore((state) => state.notifications);
  const [notificationsSearch, setNotificationsSearch] = React.useState<NotificationModel[]>([]);

  const authUser = useAppStore((state) => state.authUser);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  React.useEffect(() => {
    if (search === '') {
      return setNotificationsSearch(notifications);
    }

    if (search !== '') {
      const result = notifications.filter(
        (notification) => notification.title.toLowerCase().includes(search.toLowerCase()) || notification.body.toLowerCase().includes(search.toLowerCase())
      );
      return setNotificationsSearch(result);
    }
  }, [notifications, search]);

  return (
    <Grid>
      <ZDrawerProductAdd openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} notification={selectedNotifications} setSelectedNotification={setSelectedNotifications} />
      <Paper>
        <Grid className={classes.tableHeading} container alignItems='center' justify='space-between'>
          <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
            Notifications
          </Typography>

          {authUser && authUser?.isAdmin && (
            <>
              <Grid>
                {selectedRows.length > 0 && (
                  <Button
                    className={classes.buttonAdd}
                    onClick={() => {
                      setOpenDrawer(true);
                      setSelectedNotifications(undefined);
                    }}
                    size='small'
                    variant='contained'
                    color='secondary'
                  >
                    Delete Notifications
                  </Button>
                )}
                <Button
                  className={classes.buttonAdd}
                  onClick={() => {
                    setOpenDrawer(true);
                    setSelectedNotifications(undefined);
                  }}
                  size='small'
                  variant='contained'
                >
                  New Notification
                </Button>
              </Grid>
            </>
          )}
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
                        setSelectedRows(notificationsSearch.map((e) => e.id));
                      }
                      if (!v) {
                        setIsSelectedAllRows(v);
                        setSelectedRows([]);
                      }
                    }}
                  />
                </TableCell>
                <TableCell align='left'>Title</TableCell>
                <TableCell align='left'>Message</TableCell>
                <TableCell align='left'>Date Added</TableCell>
                <TableCell align='right'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notificationsSearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                <TableRow key={product.id}>
                  <TableCell align='left' padding='checkbox'>
                    <ZCheckbox
                      className={classes.checkbox}
                      isChecked={selectedRows.includes(product.id)}
                      onChange={(v) => {
                        if (v) setSelectedRows([...selectedRows, product.id]);
                        if (!v) setSelectedRows(selectedRows.filter((e) => e !== product.id));
                      }}
                    />
                  </TableCell>
                  <TableCell align='left'> {stringTruncate({ value: product.title, numberCharacter: 40 })}</TableCell>
                  <TableCell scope='row'>{stringTruncate({ value: product.body, numberCharacter: 40 })}</TableCell>
                  <TableCell align='left'>{DateParser(product.timestampAdded, false)}</TableCell>

                  <TableCell align='right'>
                    <Button
                      className={classes.buttonEdit}
                      onClick={() => {
                        setSelectedNotifications(Object.create(product));
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

            {notificationsSearch.length ? (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={8}
                    count={notificationsSearch.length}
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
  }
}));

NotificationPage.defaultProps = {};

export default NotificationPage;
