require 'test_helper'

class DevelopersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @developer = developers(:one)
  end

  test "should get index" do
    get developers_url, as: :json
    assert_response :success
  end

  test "should create developer" do
    assert_difference('Developer.count') do
      post developers_url, params: { developer: { first_name: @developer.first_name, last_name: @developer.last_name } }, as: :json
    end

    assert_response 201
  end

  test "should show developer" do
    get developer_url(@developer), as: :json
    assert_response :success
  end

  test "should update developer" do
    patch developer_url(@developer), params: { developer: { first_name: @developer.first_name, last_name: @developer.last_name } }, as: :json
    assert_response 200
  end

  test "should destroy developer" do
    assert_difference('Developer.count', -1) do
      delete developer_url(@developer), as: :json
    end

    assert_response 204
  end
end
