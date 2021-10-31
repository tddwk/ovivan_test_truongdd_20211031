require './test/test_helper'

RSpec.describe Technology, :type => :model do
  subject {
    described_class.new(name: "tech 1")
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without a name" do
    subject.name = nil
    expect(subject).to_not be_valid
  end

  it "is not valid with name length > 50" do
    subject.name = SecureRandom.alphanumeric(51)
    expect(subject).to_not be_valid
  end
end
