class Api::V1::ProjectsController < ApplicationController
  before_action :http_authenticate
  before_action :set_project, only: [:show, :update, :destroy]

  api :GET, '/projects'
  def index
    @projects = Project.all.includes(:technologies, :developers)
    response.headers["count"] = @projects.count

    paginate json: @projects
  end

  api :GET, '/projects/:id'
  param :id, :number
  def show
    render json: @project
  end

  api :POST, '/projects'
  def create
    if project_params[:developers_attributes].blank?
      @project.errors.add(:constraint, "Project must have at least 1 developer.")
      render json: @project.errors, status: :unprocessable_entity
    elsif project_params[:technologies_attributes].blank?
      @project.errors.add(:constraint, "Project must have at least 1 technology.")
      render json: @project.errors, status: :unprocessable_entity
    else
      @project = Project.new(project_params)

      if @project.save
        render json: @project, status: :created
      else
        render json: @project.errors, status: :unprocessable_entity
      end
    end
  end

  api :PUT, '/projects/:id'
  param :id, :number
  def update
    if project_params[:developers_attributes].blank?
      @project.errors.add(:constraint, "Project must have at least 1 developer.")
      render json: @project.errors, status: :unprocessable_entity
    elsif project_params[:technologies_attributes].blank?
      @project.errors.add(:constraint, "Project must have at least 1 technology.")
      render json: @project.errors, status: :unprocessable_entity
    else
      if @project.update(project_params)
        render json: @project
      else
        render json: @project.errors, status: :unprocessable_entity
      end
    end
  end

  api :DELETE, '/projects/:id'
  param :id, :number
  def destroy
    if @project.destroy
      render json: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  private
    def set_project
      @project = Project.find(params[:id])
    end

    def project_params
      params.require(:project).permit(
        :name, :description, :start_date, :end_date,
        developers_attributes: [:id, :first_name, :last_name, :_destroy],
        technologies_attributes: [:id, :name, :_destroy]
      )
    end
end
