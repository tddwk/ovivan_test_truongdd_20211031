100.times.each do |num|
  Technology.create!(name: SecureRandom.alphanumeric(10))
end
