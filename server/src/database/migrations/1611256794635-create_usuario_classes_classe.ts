import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsuarioClassesClasse1611256794635 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'usuario_classes_classe',
            columns: [
                {
                    name: 'usuarioSteamId',
                    type: 'integer',
                    isPrimary: true,
                },
                {
                    name: 'classeId',
                    type: 'integer',
                    isPrimary: true
                }
            ],
            foreignKeys: [
                {
                    name: 'idUsuario',
                    columnNames: ['usuarioSteamId'],
                    referencedTableName: 'usuario',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                {
                    name: 'idClasse',
                    columnNames: ['classeId'],
                    referencedTableName: 'classe',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
