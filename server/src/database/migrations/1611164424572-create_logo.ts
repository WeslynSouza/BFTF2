import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createLogo1611164424572 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'logo',
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
                    name: 'timeId',
                    type: 'varchar'
                }
            ],
            foreignKeys: [
                {
                    name: 'idTime',
                    columnNames: ['timeId'],
                    referencedTableName: 'time',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('logo');
    }

}
