class DeveloperSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name

  has_many :projects, through: :project_developers
end
