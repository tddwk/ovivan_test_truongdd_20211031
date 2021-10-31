class ProjectDeveloper < ApplicationRecord
  belongs_to :project
  belongs_to :developer

  validates :project_id, uniqueness: { scope: :developer_id }
end
