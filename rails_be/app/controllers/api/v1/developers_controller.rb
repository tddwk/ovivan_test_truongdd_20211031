class Api::V1::DevelopersController < ApplicationController
  before_action :http_authenticate
  before_action :set_developer, only: [:show, :update, :destroy]

  api :GET, '/developers'
  def index
    @developers = Developer.all.includes(:projects)
    response.headers["count"] = @developers.count

    paginate json: @developers
  end

  api :GET, '/developers/:id'
  param :id, :number
  def show
    render json: @developer
  end

  def create
    @developer = Developer.new(developer_params)

    if @developer.save
      render json: @developer, status: :created
    else
      render json: @developer.errors, status: :unprocessable_entity
    end
  end

  api :PUT, '/developers/:id'
  param :id, :number
  def update
    if @developer.update(developer_params)
      render json: @developer
    else
      render json: @developer.errors, status: :unprocessable_entity
    end
  end

  api :DELETE, '/developers/:id'
  param :id, :number
  def destroy
    if @developer.destroy
      render json: @developer
    else
      render json: @developer.errors, status: :unprocessable_entity
    end
  end

  private
    def set_developer
      @developer = Developer.find(params[:id])
    end

    def developer_params
      params.require(:developer).permit(:first_name, :last_name)
    end
end
