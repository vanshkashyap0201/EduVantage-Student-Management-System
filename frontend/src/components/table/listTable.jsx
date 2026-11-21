import { Table, Form } from "react-bootstrap";
import "./listTable.css";

export const ListTable = ({
    columns,
    data,
    loading = false,
    selectionEnabled = false,
    selectedIds = [],
    onSelectRow,
    onSelectAll
}) => {
    if (loading) {
        return (
            <div className="table-card table-loading">
                <div className="spinner-border spinner-border-sm text-primary" />
                <span>Loading...</span>
            </div>
        );
    }

    const allSelected =
        data.length > 0 &&
        data.every((row) => selectedIds.includes(row._id));

    return (
        <div className="table-card">
            <div className="table-responsive">
                <Table className="custom-list-table mb-0">
                    <thead>
                        <tr>
                            {selectionEnabled && (
                                <th>
                                    <Form.Check
                                        type="checkbox"
                                        aria-label="Select all students"
                                        checked={allSelected}
                                        onChange={(event) =>
                                            onSelectAll?.(
                                                event.target.checked
                                            )
                                        }
                                    />
                                </th>
                            )}

                            {columns.map((column) => (
                                <th key={column.key}>
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((row, index) => (
                                <tr key={row._id || index}>
                                    {selectionEnabled && (
                                        <td>
                                            <Form.Check
                                                type="checkbox"
                                                aria-label={`Select ${row.name || "record"}`}
                                                checked={selectedIds.includes(
                                                    row._id
                                                )}
                                                onChange={() =>
                                                    onSelectRow?.(row._id)
                                                }
                                            />
                                        </td>
                                    )}

                                    {columns.map((column) => (
                                        <td key={column.key}>
                                            {column.render
                                                ? column.render(row)
                                                : row[column.key] ?? "-"}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={
                                        columns.length +
                                        (selectionEnabled ? 1 : 0)
                                    }
                                    className="no-records"
                                >
                                    No records found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};