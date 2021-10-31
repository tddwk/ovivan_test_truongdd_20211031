class CreateProjectDevelopers < ActiveRecord::Migration[5.2]
  def change
    create_table :project_developers do |t|
      t.references :project, index: true
      t.references :developer, index: true

      t.timestamps
    end
  end
end
