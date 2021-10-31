class TechnologySerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :projects, through: :project_technologies
end
