import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { ReactNode, useCallback, useContext } from "react";
import LoadDataContext from "../contexts/LoadDataContext";
import { DatabaseInfo } from "../models/loadData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faEllipsisV, faTrash } from "@fortawesome/free-solid-svg-icons";

const ShowDatabases: React.FC<{}> = () => {
  const { databases, onDeleteDatabase, onShowDatabase } =
    useContext(LoadDataContext);
  // ======================================================

  let columns = [
    {
      name: "Nombre",
      key: "name",
    },
    {
      name: "Registros",
      key: "records",
    },
    {
      name: "Columnas",
      key: "columns",
    },
    {
      name: "Creada en",
      key: "createdAt",
    },
    {
      name: "Acciones",
      key: "actions",
    },
  ];

  let renderCell = useCallback<
    (value: DatabaseInfo, columnKey: string) => ReactNode
  >((value, columnKey) => {
    switch (columnKey) {
      case "name":
        return (
          <div>
            <span>{value.name}</span>
          </div>
        );
      case "createdAt":
        return new Date(value.createdAt).toLocaleDateString();
      case "columns":
        return (
          <div>
            <span>{`${value.columns} columnas`}</span>
          </div>
        );
      case "records":
        return (
          <div>
            <span>{`${value.records} registros`}</span>
          </div>
        );

      case "actions":
        // Menu Button
        return (
          <Popover>
            <PopoverTrigger>
              <Button>
                <FontAwesomeIcon icon={faEllipsisV} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Listbox aria-label="options-of-database-item">
                <ListboxItem
                  key="show"
                  textValue="show"
                  onClick={() => onShowDatabase(value.name)}
                >
                  <FontAwesomeIcon className="mr-2" icon={faBox} />
                  <span>Ver API</span>
                </ListboxItem>
                <ListboxItem
                  key="delete"
                  textValue="delete"
                  className="text-red-400"
                  onClick={() => onDeleteDatabase(value.name)}
                >
                  <FontAwesomeIcon className="mr-2" icon={faTrash} />
                  <span>Eliminar</span>
                </ListboxItem>
              </Listbox>
            </PopoverContent>
          </Popover>
        );
    }
  }, []);

  // ======================================================

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-bold">Bases de datos agregadas</h1>
      </CardHeader>
      <CardBody>
        <Table shadow="none" aria-label="Bases de datos agregadas">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={databases}>
            {(item) => (
              <TableRow key={item.name}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {renderCell(item, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default ShowDatabases;
