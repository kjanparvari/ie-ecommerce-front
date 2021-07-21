import React, {useState} from 'react';
import "../styles/Ktable.css"
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    container: {
        maxHeight: 350,
        borderRadius: 15
    },
    table: {
        // minWidth: 650,
    },
    cell: {
        fontFamily: "IRANSans",
        fontSize: "13px",
        color: "dimgray"
    }
});


function Ktable({data, headers}: any) {
    const classes = useStyles();
    return (
        <div className="ktable__container">
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {Object.keys(headers).sort().map((headerKey: string) => {
                                // @ts-ignore
                                const cellValue = headers[headerKey]
                                return <TableCell key={`header:${headerKey}`} className={classes.cell}
                                                  align="right"> {cellValue}
                                </TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row: any) => (
                            <TableRow key={row["tracing_code"]}/* onClick={() => alert(JSON.stringify(row))}*/>
                                {
                                    Object.keys(row).sort().map((key: string) => {
                                        // @ts-ignore
                                        const cellValue = row[key]
                                        return <TableCell align="right"  className={classes.cell}>{cellValue}</TableCell>
                                    })
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}

export default Ktable;
