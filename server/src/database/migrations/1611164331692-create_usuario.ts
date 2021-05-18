import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsuario1611164331692 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "usuario",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "nick",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "steamId",
                    type: "varchar",
                    isUnique: true,
                    isNullable: true,
                },
                {
                    name: "senha",
                    type: "varchar",
                },
                {
                    name: "avatar",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "timeId",
                    type: "integer",
                    isNullable: true
                },
                {
                    name: "acesso",
                    type: "integer",
                    isNullable: true,
                },
                {
                    name: "elegivel",
                    type: "integer",
                    isNullable: true
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
