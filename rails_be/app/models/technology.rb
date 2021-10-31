class Technology < ApplicationRecord
  has_many :project_technologies
  has_many :projects, through: :project_technologies

  before_destroy :check_using_status

  validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 50 }

  private

  def check_using_status
    if projects.present?
      errors.add(:constraint, "This technology is using by another projects.")
      throw :abort
    end
  end
end
