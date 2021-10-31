class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :start_date, :end_date

  has_many :developers, through: :project_developers
  has_many :technologies, through: :project_technologies
end
