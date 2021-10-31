Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :developers, except: [:new, :create]
      resources :projects
      resources :technologies
    end
  end
end
