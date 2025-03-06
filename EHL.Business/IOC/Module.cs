﻿using EHL.Business.Implements;
using EHL.Business.Interfaces;
using EHL.DB.Implements;
using EHL.DB.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EHL.Business.IOC
{
	public static class Module
	{
		public static Dictionary<Type, Type> GetTypes()
		{
			var dic = new Dictionary<Type, Type>
			{
				{typeof(IUserManager), typeof(UserManager) },
				{typeof(ILandingPageManager), typeof(LandingPageManager) },
				{typeof(IAttributeManager), typeof(AttributeManager) },
				{typeof(IEmerManager), typeof(EmerManager) }
			};
			return dic;
		}
	}
}
