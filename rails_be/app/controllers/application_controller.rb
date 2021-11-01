class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Basic::ControllerMethods

  def http_authenticate
    authenticate_or_request_with_http_basic do |username, password|
      HTTPAuthUsers.detect do |u|
        username == u['username'] && password == u['password']
      end
    end
  end
end
