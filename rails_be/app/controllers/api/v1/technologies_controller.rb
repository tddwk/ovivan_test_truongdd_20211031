class Api::V1::TechnologiesController < ApplicationController
  before_action :set_technology, only: [:show, :update, :destroy]

  def index
    @technologies = Technology.all.includes(:projects)

    render json: @technologies
  end

  def show
    render json: @technology
  end

  def create
    @technology = Technology.new(technology_params)

    if @technology.save
      render json: @technology, status: :created
    else
      render json: @technology.errors, status: :unprocessable_entity
    end
  end

  def update
    if @technology.update(technology_params)
      render json: @technology
    else
      render json: @technology.errors, status: :unprocessable_entity
    end
  end

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
