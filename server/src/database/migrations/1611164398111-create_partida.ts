import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPartida1611164398111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'partida',
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
                    name: 'time1Id',
                    type: 'integer',
                },
                {
                    name: 'time2Id',
                    type: 'integer',
                },
                {
                    name: 'divisaoId',
                    type: 'integer'
                },
                {
                    name: 'dataHora',
                    type: 'varchar'
                }
            ],
            foreignKeys: [
                {
                    name: 'idDivisao',
                    columnNames: ['divisaoId'],
                    referencedTableName: 'divisao',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                {
                    name: 'idTime1',
                    columnNames: ['time1Id'],
                    referencedTableName: 'time',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                {
                    name: 'idTime2',
                    columnNames: ['time2Id'],
                    referencedTableName: 'time',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('partida')
    }

}
