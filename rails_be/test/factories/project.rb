FactoryGirl.define do
  factory :project do
    name "project 1"
    description "desc 1"
    start_date "2021-10-10"
    association :technologies
    association :developers
  end
end
