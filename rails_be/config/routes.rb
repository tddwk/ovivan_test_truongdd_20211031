Rails.application.routes.draw do
  apipie
  namespace :api do
    namespace :v1 do
      resources :developers, except: [:create]
      resources :projects
      resources :technologies
    end
  end
end
