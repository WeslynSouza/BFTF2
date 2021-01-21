import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsuario1611164331692 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "usuario",
            columns: [
                {
                    name: "steamID",
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
                    name: "avatar",
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
                    type: "varchar",
                }
            ],
            foreignKeys: [
                {
                    name: "idAvatar",
                    columnNames: ['avatar'],
                    referencedTableName: 'imagemUser',
                    referencedColumnNames: ['imagemID'],
                },
                {
                    name: "idTime",
                    columnNames: ['time'],
                    referencedTableName: 'time',
                    referencedColumnNames: ['timeID'],
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuario');
    }

}
