import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Alert,
} from "@mui/material";
import { Description, PostAdd, Edit } from "@mui/icons-material";
import Spinner from "../Spinner";
import { SxProps } from "@mui/system";

export type Column = {
  id: string;
  label: string;
  minWidth?: number;
  width?: number;
  align?: "inherit" | "justify" | "left" | "right";
  format?: (value: any) => any;
};

interface Props {
  sx?: SxProps;
  rowsLimit?: number;
  currentPage?: number;
  columns: Column[];
  rows: ({ [key: Column["id"]]: any } | undefined)[];
  loading: boolean;
}

const ICONS: {
  [key: string]: JSX.Element;
} = {
  detail: <Description />,
  add: <PostAdd />,
  edit: <Edit />,
};

const ActionTable = ({
  sx,
  columns = [{ id: "", label: "" }],
  rows = [],
  rowsLimit = 20,
  currentPage = 1,
  loading,
}: Props) => {
  // const [page, setPage] = useState(currentPage);
  // const [rowsPerPage, setRowsPerPage] = useState(rowsLimit);

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <TableContainer sx={{ maxHeight: "70vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align ?? "center"}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  if (row)
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align ?? "center"}
                            >
                              {value.isAction ? (
                                <IconButton
                                  aria-label={row.icon}
                                  component="label"
                                  color={value.iconColor ?? "primary"}
                                  size={value.iconSize}
                                  onClick={() => value.callback(row)}
                                >
                                  {ICONS[value.icon]}
                                </IconButton>
                              ) : column.format ? (
                                column.format(value)
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
};

export default ActionTable;
