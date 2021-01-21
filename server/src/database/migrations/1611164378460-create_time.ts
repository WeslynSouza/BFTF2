import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTime1611164378460 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'time',
            columns: [
                {
                    name: 'timeID',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'lider',
                    type: 'varchar',
                },
                {
                    name: 'nome',
                    type: 'varchar',
                },
                {
                    name: 'logo',
                    type: 'integer',
                },
                {
                    name: 'divisao',
                    type: 'integer',
                }
            ],
            foreignKeys: [
                {
                    name: 'idLider',
                    columnNames: ['lider'],
                    referencedTableName: 'usuario',
                    referencedColumnNames: ['steamID'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                {
                    name: 'idDivisao',
                    columnNames: ['divisao'],
                    referencedTableName: 'divisao',
                    referencedColumnNames: ['divisaoID'],
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('time');
    }

}
