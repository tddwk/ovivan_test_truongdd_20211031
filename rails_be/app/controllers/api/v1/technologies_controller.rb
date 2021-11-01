class Api::V1::TechnologiesController < ApplicationController
  before_action :http_authenticate
  before_action :set_technology, only: [:show, :update, :destroy]

  api :GET, '/technologies'
  def index
    @technologies = Technology.all.includes(:projects)
    response.headers["count"] = @technologies.count

    paginate json: @technologies
  end

  api :GET, '/technologies/:id'
  param :id, :number
  def show
    render json: @technology
  end

  api :POST, '/technologies'
  def create
    @technology = Technology.new(technology_params)

    if @technology.save
      render json: @technology, status: :created
    else
      render json: @technology.errors, status: :unprocessable_entity
    end
  end

  api :PUT, '/technologies/:id'
  param :id, :number
  def update
    if @technology.update(technology_params)
      render json: @technology
    else
      render json: @technology.errors, status: :unprocessable_entity
    end
  end

  api :DELETE, '/technologies/:id'
  param :id, :number
  def destroy
    if @technology.destroy
      render json: @technology
    else
      render json: @technology.errors, status: :unprocessable_entity
    end
  end

  private
    def set_technology
      @technology = Technology.find(params[:id])
    end

    def technology_params
      params.require(:technology).permit(:name)
    end
end
