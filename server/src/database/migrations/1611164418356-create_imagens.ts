import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImagens1611164418356 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'imagens',
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
                    name: 'post',
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: 'idPost',
                    columnNames: ['post'],
                    referencedTableName: 'post',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('imagens')
    }

}
