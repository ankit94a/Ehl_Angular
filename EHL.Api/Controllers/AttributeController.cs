using EHL.Business.Interfaces;
using EHL.Common.Models;
using InSync.Api.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace EHL.Api.Controllers
{
	[Route("api/[controller]")]
	public class AttributeController : ControllerBase
	{
		private readonly IAttributeManager _attributeManager;
		public AttributeController(IAttributeManager attributeManager)
		{
			_attributeManager = attributeManager;
		}
		[HttpPost, Route("category")]
		public IActionResult AddCategory([FromBody] Category category)
		{
			category.Name = category.Name.ToUpper();
			category.CreatedBy = HttpContext.GetUserId();
			category.CreatedOn = DateTime.Now;
			category.IsDeleted = false;
			category.IsActive = true;
			return Ok(_attributeManager.AddCategory(category));
		}
		[HttpPost, Route("subcategory")]
		public IActionResult AddSubCategory([FromBody] SubCategory subCategory)
		{
			subCategory.Name = subCategory.Name.ToUpper();
			subCategory.CreatedBy = HttpContext.GetUserId();
			subCategory.CreatedOn = DateTime.Now;
			subCategory.IsDeleted = false;
			subCategory.IsActive = true;
			return Ok(_attributeManager.AddSubCategory(subCategory));
		}
		[HttpPost, Route("eqpt")]
		public IActionResult AddEqpt([FromBody] Eqpt eqpt)
		{
			eqpt.Name = eqpt.Name.ToUpper();
			eqpt.CreatedBy = HttpContext.GetUserId();
			eqpt.CreatedOn = DateTime.Now;
			eqpt.IsDeleted = false;
			eqpt.IsActive = true;
			return Ok(_attributeManager.AddEqpt(eqpt));
		}
		[HttpGet, Route("category")]
		public IActionResult GetCategory()
		{
			return Ok(_attributeManager.GetCategories());
		}
		[HttpGet, Route("subcategory{categoryId}")]
		public IActionResult GetSubCategory(long categoryId)
		{
			return Ok(_attributeManager.GetSubCategories(categoryId));
		}
		[HttpGet, Route("eqpt{categoryId}/{subCategoryId}")]
		public IActionResult GetSubCategory(long categoryId,long subCategoryId)
		{
			return Ok(_attributeManager.GetEqpt(categoryId,subCategoryId));
		}
		[HttpPut, Route("category")]
		public IActionResult DeactiveCategory([FromBody] Category category)
		{
			return Ok(_attributeManager.DeactivateCategory(category.Id));
		}
		[HttpPut, Route("subcategory")]
		public IActionResult DeactiveSubCategory([FromBody] SubCategory subCategory)
		{
			return Ok(_attributeManager.DeactivateSubCategory(subCategory.Id));
		}
		[HttpPut, Route("eqpt")]
		public IActionResult DeactiveEqpt([FromBody] Eqpt eqpt)
		{
			return Ok(_attributeManager.DeactivateCategory(eqpt.Id));
		}
	}
}
