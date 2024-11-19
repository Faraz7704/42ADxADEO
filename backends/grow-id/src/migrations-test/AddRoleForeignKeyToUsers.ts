import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRoleForeignKeyToUsers implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['role'],
        referencedTableName: 'roles',
        referencedColumnNames: ['name'],
        onDelete: 'SET NULL', // Behavior when a role is deleted
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('users');
    const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.includes('role'));
    if (foreignKey) {
      await queryRunner.dropForeignKey('users', foreignKey);
    }
  }
}
