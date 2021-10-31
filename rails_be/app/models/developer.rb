class Developer < ApplicationRecord
  has_many :project_developers
  has_many :projects, through: :project_developers

  validates :first_name, :last_name, presence: true, format: {with: /\A[a-zA-Z]+\z/}, length: { maximum: 100 }
  validates :first_name, uniqueness: { scope: :last_name, case_sensitive: false }

  before_destroy :check_working_status

  private

  def check_working_status
    projects.each do |project|
      if project.developers.length == 1
        errors.add(:constraint, "The project #{project.name} has only this developer. Please delete his project first.")
        throw :abort
      end
    end
    project_developers.each { |x| x.destroy }
  end

end
