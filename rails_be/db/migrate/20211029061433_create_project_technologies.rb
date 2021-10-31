class CreateProjectTechnologies < ActiveRecord::Migration[5.2]
  def change
    create_table :project_technologies do |t|
      t.references :project, index: true
      t.references :technology, index: true

      t.timestamps
    end
  end
end
