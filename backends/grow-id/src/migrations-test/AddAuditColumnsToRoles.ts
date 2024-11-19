import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAuditColumnsToRoles implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'roles',
      new TableColumn({
        name: 'assignedBy',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('roles', 'assignedBy');
  }
}
