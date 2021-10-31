require './test/test_helper'

RSpec.describe Developer, :type => :model do
  subject {
    described_class.new(first_name: "alan", last_name: "walker")
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without a name" do
    subject.first_name = nil
    expect(subject).to_not be_valid
  end

  it "is not valid with first_name has number char" do
    subject.first_name = "alan1"
    expect(subject).to_not be_valid
  end
end
