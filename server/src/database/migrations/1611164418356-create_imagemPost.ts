import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImagemPost1611164418356 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'imagemPost',
            columns: [
                {
                    name: 'imagemID',
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
                    referencedColumnNames: ['postID'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('imagemPost')
    }

}
