import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createavatar1611164430877 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'avatar',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'path',
                    type: 'varchar'
                },
                {
                    name: 'usuarioSteamId',
                    type: 'varchar',
                }
            ],
            foreignKeys: [
                {
                    name: 'idUsuario',
                    columnNames: ['usuarioSteamId'],
                    referencedTableName: 'usuario',
                    referencedColumnNames: ['steamId'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('avatar');
    }

}