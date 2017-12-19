require 'test_helper'

class HotelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @hotel = hotels(:one)
  end

  test "should get index" do
    get hotels_url, as: :json
    assert_response :success
  end

  test "should create hotel" do
    assert_difference('Hotel.count') do
      post hotels_url, params: { hotel: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show hotel" do
    get hotel_url(@hotel), as: :json
    assert_response :success
  end

  test "should update hotel" do
    patch hotel_url(@hotel), params: { hotel: {  } }, as: :json
    assert_response 200
  end

  test "should destroy hotel" do
    assert_difference('Hotel.count', -1) do
      delete hotel_url(@hotel), as: :json
    end

    assert_response 204
  end
end
