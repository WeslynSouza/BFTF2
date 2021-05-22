import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class userAtividade1621710694473 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_atividade',
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
                    name: 'usuarioId',
                    type: 'integer',
                },
                {
                    name: 'tipo',
                    type: 'integer',
                },
                {
                    name: 'data',
                    type: 'varchar',
                },
                {
                    name: 'nomeTime',
                    type: 'varchar',
                    isNullable: true
                }
            ],
            foreignKeys: [
                {
                    name: 'idUsuario',
                    columnNames: ['usuarioId'],
                    referencedTableName: 'usuario',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_atividade');
    }

}
