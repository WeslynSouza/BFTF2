import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTime1611164378460 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'time',
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
                    name: 'liderId',
                    type: 'integer',
                },
                {
                    name: 'viceLiderId',
                    type: 'integer',
                    isNullable: true
                },
                {
                    name: 'nome',
                    type: 'varchar',
                },
                {
                    name: 'logo',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'ativo',
                    type: 'boolean',
                },
                {
                    name: 'divisaoId',
                    type: 'integer',
                }
            ],
            foreignKeys: [
                {
                    name: 'idLider',
                    columnNames: ['liderId'],
                    referencedTableName: 'usuario',
                    referencedColumnNames: ['id'],
                },
                {
                    name: 'idViceLider',
                    columnNames: ['viceLiderId'],
                    referencedTableName: 'usuario',
                    referencedColumnNames: ['id'],
                },
                {
                    name: 'idDivisao',
                    columnNames: ['divisaoId'],
                    referencedTableName: 'divisao',
                    referencedColumnNames: ['id'],
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('time');
    }

}
