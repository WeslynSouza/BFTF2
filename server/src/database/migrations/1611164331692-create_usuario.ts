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
                    name: "avatarId",
                    type: "integer",
                    isNullable: true,
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
                }
            ],
            foreignKeys: [
                {
                    name: 'idAvatar',
                    columnNames: ['avatarId'],
                    referencedTableName: 'avatar',
                    referencedColumnNames: ['id'],
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuario');
    }

}
