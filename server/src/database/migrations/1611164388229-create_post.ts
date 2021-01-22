import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPost1611164388229 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'post',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'autorSteamId',
                    type: 'varchar',
                },
                {
                    name: 'titulo',
                    type: 'varchar',
                },
                {
                    name: 'conteudo',
                    type: 'varchar'
                }
            ],
            foreignKeys: [
                {
                    name: 'idAutor',
                    columnNames: ['autorSteamId'],
                    referencedTableName: 'usuario',
                    referencedColumnNames: ['steamId'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('post');
    }

}