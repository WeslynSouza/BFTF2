import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsuario1611164331692 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "usuario",
            columns: [
                {
                    name: "steamId",
                    type: "varchar",
                    isPrimary: true,
                },
                {
                    name: "nick",
                    type: "varchar",
                },
                {
                    name: "senha",
                    type: "varchar",
                },
                {
                    name: "time",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "acesso",
                    type: "integer",
                    isNullable: true,
                },
                {
                    name: 'timeId',
                    type: 'integer',
                    isNullable: true,
                }
            ],
            foreignKeys: [
                {
                    name: 'idTime',
                    columnNames: ['timeId'],
                    referencedTableName: 'time',
                    referencedColumnNames: ['id'],
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuario');
    }

}
