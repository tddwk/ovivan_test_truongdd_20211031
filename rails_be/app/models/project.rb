class Project < ApplicationRecord
  has_many :project_developers
  has_many :developers, through: :project_developers
  has_many :project_technologies
  has_many :technologies, through: :project_technologies, dependent: :destroy

  accepts_nested_attributes_for :developers, allow_destroy: true, reject_if: :all_blank
  accepts_nested_attributes_for :technologies, allow_destroy: true, reject_if: :all_blank

  validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 255 }
  validates :description, presence: true, length: { maximum: 1_000 }
  validates :start_date, presence: true

  # validates :start_date,
  #           inclusion: { in: ->(i) { [i.start_date_was] } },
  #           on: :update

  attr_readonly :start_date # skip this field when update

  before_destroy :remove_potential_alone_developers

  before_validation :find_or_create_children_data

  private

  def remove_potential_alone_developers
    developers.each do |developer|
      projects = developer.projects
      if projects.length == 1 && projects[0].id == id
        developer.delete # use delete here to skip the constraint
      end
    end
    project_developers.each { |x| x.destroy }
  end

  def find_or_create_children_data
    destroyed_developer_num = 0
    self.developers = self.developers.uniq{|d| [d.first_name, d.last_name]}.map do |developer|
      if developer.new_record?
        Developer.find_or_create_by(first_name: developer.first_name, last_name: developer.last_name)
      else
        destroyed_developer_num += 1 if developer._destroy
        developer
      end
    end

    if destroyed_developer_num == self.developers.length
      errors.add(:constraint, "Project must have at least 1 developer.")
      throw :abort
    end

    destroyed_technology_num = 0
    self.technologies = self.technologies.uniq{|t| [t.name]}.map do |technology|
      if technology.new_record?
        Technology.find_or_create_by(name: technology.name)
      else
        destroyed_technology_num += 1 if technology._destroy
        technology
      end
    end

    if destroyed_technology_num == self.technologies.length
      errors.add(:constraint, "Project must have at least 1 technology.")
      throw :abort
    end
  end
end
