import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPost1611164388229 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'post',
            columns: [
                {
                    name: 'postID',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'autor',
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
                    columnNames: ['autor'],
                    referencedTableName: 'usuario',
                    referencedColumnNames: ['steamID'],
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
