import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
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
import { RiEditLine } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import { DateParser } from '../../app_utils/TimeParser';
import ZDrawerUserAdd from '../../components/ZDrawerUserAdd';
import ZTextField from '../../components/ZTextField';
import { AuthUser } from '../../models/AuthUserModel';
import { useAppStore } from '../../models_stores/appStore';

interface Props {}

const UsersPage: React.FC<Props> = () => {
  const classes = useStyles();
  const [search, setSearch] = React.useState<string>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [selectedUser, setSelectedUser] = React.useState<AuthUser>();
  const history = useHistory();

  const users = useAppStore((state) => state.users);
  const [usersSearch, setUsersSearch] = React.useState<AuthUser[]>([]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    if (search === '' || search == null) return setUsersSearch(users);
    if (search) return setUsersSearch(users.filter((user) => user.getFullName().toLowerCase().includes(search.toLowerCase())));
  }, [users, search]);

  function goToProductDetailsPage(id: string) {
    history.push(`/productDetails/${id}`);
  }
  return (
    <Container maxWidth='lg'>
      <ZDrawerUserAdd openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} user={selectedUser} setSelectedUser={setSelectedUser} />
      <Paper>
        <Grid container alignItems='center' justify='space-between'>
          <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
            Users
          </Typography>

          <Button
            className={classes.buttonAdd}
            onClick={() => {
              setOpenDrawer(true);
              setSelectedUser(undefined);
            }}
            size='small'
            variant='contained'
          >
            Add User
          </Button>
        </Grid>

        <Grid container alignItems='center' justify='space-between'>
          <Grid item md={12}>
            <ZTextField className={classes.search} onChange={setSearch} defaultValue={''} label='Search users...' />
          </Grid>
        </Grid>

        <Divider className={classes.divider} />
        <TableContainer>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>

                <TableCell align='left'>Last Login</TableCell>
                <TableCell align='left'>Date Added</TableCell>
                <TableCell align='left'>Status</TableCell>
                <TableCell align='left'>Admin</TableCell>
                <TableCell align='left'>Edit/View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersSearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow key={user.id}>
                  <TableCell scope='row'>{user.getFullName()}</TableCell>
                  <TableCell scope='row'>{user.email}</TableCell>
                  <TableCell align='left'>{DateParser(user.timestampLastLogin, false)}</TableCell>
                  <TableCell align='left'>{DateParser(user.timestampAdded, false)}</TableCell>
                  <TableCell align='left'>
                    {user.isActive ? (
                      <Button className={classes.buttonStatus} size='small' color='primary' variant='contained'>
                        Active
                      </Button>
                    ) : (
                      <Button className={classes.buttonStatus} size='small' color='secondary' variant='contained'>
                        Inactive
                      </Button>
                    )}
                  </TableCell>

                  <TableCell align='left'>
                    {user.isAdmin ? (
                      <Button className={classes.buttonStatus} size='small' color='primary' variant='contained'>
                        Yes
                      </Button>
                    ) : (
                      <Button className={classes.buttonStatus} size='small' color='secondary' variant='contained'>
                        No
                      </Button>
                    )}
                  </TableCell>
                  <TableCell align='left' colSpan={1}>
                    <IconButton
                      className={classes.iconButtonContainer}
                      onClick={() => {
                        setSelectedUser(Object.create(user));
                        setOpenDrawer(true);
                      }}
                    >
                      <RiEditLine className={classes.iconButtonEdit} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={7}
                  count={usersSearch.length}
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
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  search: {
    margin: '10px 10px'
  },
  itemsGrid: {
    marginTop: 30
  },
  buttonView: {
    padding: 0
  },
  buttonStatus: {
    padding: 0
  },
  title: {
    padding: '10px 10px'
  },
  divider: {
    margin: '20px 0'
  },
  buttonAdd: {
    margin: 10
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
    minWidth: 650
  },
  tablePagination: {
    width: '100%'
  },
  itemText: {
    // margin: '5px auto'
  },
  iconButtonContainer: {
    padding: 0,
    marginLeft: 20
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
  }
}));

UsersPage.defaultProps = {};

export default UsersPage;
